import { useAuth } from "@/hooks/useAuth";

const AccountTab = () => {
  const { user } = useAuth();

  return (
    <div>

      <h2 className="text-2xl font-semibold text-white">
        Account
      </h2>

      <p className="mt-2 text-zinc-500">
        Your account information.
      </p>

      <div className="mt-10 space-y-6">

        <div>

          <p className="text-sm text-zinc-500">
            Full Name
          </p>

          <h3 className="mt-1 text-lg text-white">
            {user?.fullName}
          </h3>

        </div>

        <div>

          <p className="text-sm text-zinc-500">
            Email Address
          </p>

          <h3 className="mt-1 text-lg text-white">
            {user?.email}
          </h3>

        </div>

      </div>

    </div>
  );
};

export default AccountTab;