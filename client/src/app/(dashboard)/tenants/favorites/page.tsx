"use client";
import Card from "@/components/Card";
import Headers from "@/components/Headers";
import Loading from "@/components/Loading";
import {
  useGetAuthUserQuery,
  useGetPropertiesQuery,
  useGetTenantQuery,
} from "@/state/api";
import React from "react";

const Favorites = () => {
  const { data: authUser } = useGetAuthUserQuery();
  const { data: tenant } = useGetTenantQuery(
    authUser?.cognitoInfo?.userId || " ",
    {
      skip: !authUser?.cognitoInfo?.userId,
    }
  );

  const {
    data: favoriteProperties,
    isLoading,
    isError,
  } = useGetPropertiesQuery(
    { favoriteIds: tenant?.favorites?.map((fav: { id: number }) => fav.id) },
    { skip: !tenant?.favorites || tenant?.favorites.length === 0 }
  );

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <div>Error loading favorites</div>;
  }

  return (
    <div className="dashboard-container">
      <Headers
        title="Your Favorite Properties"
        subtitle="Browse and manage your saved property listings"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favoriteProperties?.map((property) => (
          <Card
            key={property.id}
            property={property}
            isFavorite={true}
            onFavoriteToggle={() => {}}
            showFavoriteButton={false}
            propertyLink={`/tenants/residences/${property.id}`}
          />
        ))}
      </div>
      {(!favoriteProperties || favoriteProperties.length === 0) &&
      (
        <p>your don&lsquo;t have any favorite properties</p>
      )
      }
    </div>
  );
};

export default Favorites;
