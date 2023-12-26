const Tablist: React.FC<{
  tablist: string[];
  activeTab: string;
  onTabSelect: (tab: string) => void;
}> = ({ tablist, onTabSelect, activeTab }) => {
  return (
    <div className="flex gap-[3px] w-fit">
      {tablist.map((tab) => (
        <button
          className={
            'text-2  text-f12 font-[500] px-2 py-1 rounded-[5px]' +
            (activeTab == tab ? ' text-brand bg-lightBrand' : '')
          }
          onClick={() => onTabSelect(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

const SearchTab: React.FC<{ keyword: string; onClose?: () => void }> = ({
  keyword,
  onClose,
}) => {
  return (
    <button
      className={
        ' flex gap-4 text-f12 font-[500] px-2 py-1 rounded-[5px]  text-brand bg-lightBrand'
      }
    >
      {keyword}
      <button onClick={onClose}>X</button>
    </button>
  );
};

export { Tablist, SearchTab };
