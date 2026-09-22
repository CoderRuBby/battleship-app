import type { ReactNode } from 'react';

interface boardContainerProps {
  children: ReactNode;
  label: string;
}

export function BoardContainer({ children, label }: boardContainerProps) {
  return (
    <section
      className='
          flex flex-wrap justify-center items-center gap-10 
          shadow-[0px_0px_9px_-1px_black]

          w-70 h-70 
          [@media(max-height:700px)]:h-70 [@media(max-height:700px)]:w-70
          
          pointer-coarse:portrait:xs:w-90 pointer-coarse:portrait:xs:h-90
          pointer-coarse:portrait:md:w-105 pointer-coarse:portrait:md:h-105 pointer-coarse:portrait:lg:w-140 pointer-coarse:portrait:lg:h-140

          portrait:sm:w-80 portrait:sm:h-80 portrait:md:w-85 portrait:md:h-85
          
          landscape:md:w-75 landscape:md:h-75  landscape:lg:w-115 landscape:lg:h-115 
          landscape:xl:w-150 landscape:xl:h-150
        '
      aria-label={label}
    >
      {children}
    </section>
  );
}
