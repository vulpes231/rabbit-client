const Sidelink = ({ title, icon, active, onClick }) => {
  return (
    <div
      className={`cursor-pointer flex items-center justify-start gap-2 py-2 px-4 rounded-lg capitalize text-xs ${
        active ? "bg-red-500 text-white" : "hover:bg-red-50"
      }`}
      onClick={onClick}
    >
      {icon}
      <span>{title}</span>
    </div>
  );
};

export default Sidelink;
