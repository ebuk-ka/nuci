import { cn } from "@/utils/cn";

interface AvatarProps {
  name: string;
  image?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-lg",
};

const Avatar = ({
  name,
  image,
  size = "md",
}: AvatarProps) => {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (image) {
    return (
      <img
        src={image}
        alt={name}
        className={cn(
          "rounded-full object-cover",
          sizes[size]
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-cyan-500 font-semibold text-white",
        sizes[size]
      )}
    >
      {initials}
    </div>
  );
};

export default Avatar;