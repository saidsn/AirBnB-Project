"use client";
import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartBUtton from "../HeartBUtton";
import Button from "../Button";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  console.log(location?.label);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) return;

      onAction?.(actionId);
    },
    [onAction, disabled, actionId]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const startDate = new Date(reservation.startDate);
    const endDate = new Date(reservation.endDate);

    return `${format(startDate, "PP")} - ${format(endDate, "PP")}`;
  }, [reservation]);

  return (
    <div
      className="col-span-1 cursor-pointer group"
      onClick={() => {
        router.push(`/listings/${data.id}`);
      }}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative rounded-xl overflow-hidden">
          <Image
            className="object-cover h-full w-full group-hover:scale-125 transition duration-500"
            fill
            alt="Listing image"
            src={data.imageSrc}
          />
          <div className="absolute top-3 right-3">
            <HeartBUtton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
      </div>
      <div className="font-semibold text-lg">
        {location?.region}, {location?.label}
      </div>
      <div className="font-light text-neutral-500">
        {reservationDate || data.category}
      </div>
      <div className="flex flex-row items-center gap-1">
        <div className="font-semibold">${price}</div>
        {reservation && <div className="font-light">night</div>}
      </div>
      {onAction && actionLabel && (
        <Button
          disabled={disabled}
          small
          label={actionLabel}
          onClick={handleCancel}
        />
      )}
    </div>
  );
};

export default ListingCard;
