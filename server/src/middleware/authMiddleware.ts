// import { Request, Response, NextFunction } from "express";
// import jwt, { JwtPayload } from "jsonwebtoken";

// // Add a secret key (replace with your actual secret or Cognito public key)
// const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; 

// declare global {
//   namespace Express {
//     interface Request {
//       user?: {
//         id: string;
//         role: string;
//       };
//     }
//   }
// }

// export const authMiddleware = (allowedRoles: string[]) => {
//   return (req: Request, res: Response, next: NextFunction): void => {
//     const token = req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       res.status(401).json({ message: "Unauthorized" });
//       return;
//     }

//     try {
//       // Verify and decode the token
//       const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & { 
//         sub: string; 
//         "custom:role"?: string;
//       };

//       const userRole = decoded["custom:role"];
//       if (!userRole || !allowedRoles.includes(userRole.toLowerCase())) {
//         res.status(403).json({ message: "Access Denied" });
//         return;
//       }

//       // Attach user to the request
//       req.user = {
//         id: decoded.sub,
//         role: userRole,
//       };

//       next();
//     } catch (err) {
//       console.error("Token verification failed:", err);
//       res.status(403).json({ message: "Invalid or expired token" });
//     }
//   };
// };



import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  sub: string;
  "custom:role"?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}

export const authMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    try {
      const decoded = jwt.decode(token) as DecodedToken;
      const userRole = decoded["custom:role"] || "";
      req.user = {
        id: decoded.sub,
        role: userRole,
      };

      const hasAccess = allowedRoles.includes(userRole.toLowerCase());
      if (!hasAccess) {
        res.status(403).json({ message: "Access Denied" });
        return;
      }
    } catch (err) {
      console.error("Failed to decode token:", err);
      res.status(400).json({ message: "Invalid token" });
      return;
    }

    next();
  };
};