import { IconBlock } from './IconBlock';

export function Legend() {
  return (
    <div
      className="
        flex w-fit gap-10 
        whitespace-nowrap rounded-lg 
        text-2xl p-2 bg-no-repeat bg-center
        bg-[url('/images/ship-container.svg')]
        shadow-[0px_4px_79px_4px_rgba(0,0,0,1)_inset,0px_0px_8px_3px_rgba(0,0,0,1)]
        
        lg:text-[clamp(2.5rem,2.5dvw,3rem)] lg:p-2.5
        "
    >
      <IconBlock iconName='miss' />
      <IconBlock iconName='hit' />
    </div>
  );
}
