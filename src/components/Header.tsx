export default function Header() {
  return (
    <div className=" flex h-[149px] w-screen items-end justify-between bg-[#CBE2DA] p-6 px-12">
      <div className="h-[103px] w-[103px] rounded-full bg-[#ABC0B6] "></div>
      <div className="flex items-end gap-4">
        <Button label={"Contacts"} />
        <Button label={"Notes"} />
        <Button label={"Analytics"} />
        <Button label={"Quotes"} />
        <div>
          <div className="h-16 w-16 rounded-full bg-[#ABC0B6] "></div>
        </div>
      </div>
    </div>
  );
}

function Button({ label }: { label: string }) {
  return (
    <div>
      <button className="h-10 w-20 rounded-full bg-[#ABC0B6]">{label}</button>
    </div>
  );
}
