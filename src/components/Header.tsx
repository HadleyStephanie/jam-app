import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Header() {
  const { data: sessionData } = useSession();

  if (!sessionData) return;
  return (
    <div className=" flex h-[90px] w-screen items-end justify-between  bg-slate-50 p-4  px-12 drop-shadow-lg">
      <Link href="/" className="flex items-end gap-4">
        <Image
          src="/../public/images/logo.jpg"
          width={80}
          height={80}
          alt="Just a moment logo"
        />
      </Link>
      <div className="flex items-end gap-4">
        <Link href="/contacts">
          <Button label={"Contacts"} />
        </Link>
        <Link href="/groups">
          <Button label={"Groups"} />
        </Link>
        <Link href="/notes">
          <Button label={"Notes"} />
        </Link>
        <Link href="/insights">
          <Button label={"Insights"} />
        </Link>
        <Link href="/quotes">
          {" "}
          <Button label={"Quotes"} />
        </Link>

        <div>
          <button
            className="h-16 w-16 rounded-full bg-[#ABC0B6] "
            onClick={sessionData ? () => void signOut() : () => void signIn()}
          >
            {sessionData && (
              <Image
                src={sessionData?.user.image ?? ""}
                alt="profile-picture"
                width={64}
                height={64}
                className="rounded-full"
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function Button({ label }: { label: string }) {
  return (
    <div>
      <button className="h-12 w-24 rounded-full font-light drop-shadow-md">
        {label}
      </button>
    </div>
  );
}
