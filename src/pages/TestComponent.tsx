import { useProtection } from '../Helpers/useProtection';
import { PrimaryBtn } from '../components/Buttons';

const TestComponent: React.FC<any> = ({}) => {
  const [protect] = useProtection();
  const handleClick = () => {
    alert('Yessss!');
  };
  return (
    <div>
      <PrimaryBtn onClick={() => protect(handleClick)}>
        I am protected Button
      </PrimaryBtn>
      hello test
    </div>
  );
};

export { TestComponent };
