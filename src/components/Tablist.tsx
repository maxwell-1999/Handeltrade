const Tablist: React.FC<{
  tablist: string[];
  activeTab: string;
  onTabSelect: (tab: string) => void;
}> = ({ tablist, onTabSelect, activeTab }) => {
  return (
    <div className="flex gap-[3px]">
      {tablist.map((tab) => (
        <button
          className={
            'text-2  text-f12 font-[500] px-2 py-1 rounded-[5px]' +
            (activeTab == tab ? ' text-brand bg-lightBrand' : '')
          }
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export { Tablist };
