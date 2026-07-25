export function Legend() {
  return (
    <div
      className='
        flex w-fit gap-10 
        whitespace-nowrap rounded-lg 
        text-2xl p-2
        shadow-[0px_4px_79px_4px_rgba(0,0,0,1)_inset,0px_0px_8px_3px_rgba(0,0,0,1)]
        lg:text-[clamp(2.5rem,4dvw,4rem)] lg:p-4
        '
    >
      <div
        className='
            flex items-center flex-wrap justify-center
            gap-2
        '
      >
        <h2>Miss = </h2>
        <img
          src='/images/miss.png'
          alt='miss'
          className='w-8 h-8
            md:w-[2.7rem] md:h-[2.7rem] 
            lg:w-[clamp(4rem,6.5dvw,6rem)] lg:h-[clamp(4rem,6.5dvw,6rem)]
            '
        />
      </div>
      <div
        className='
            flex items-center flex-wrap justify-center
            gap-2 
        '
      >
        <h2>Hit = </h2>
        <img
          src='/images/hit.png'
          alt='hit'
          className='w-8 h-8
            md:w-[2.7rem] md:h-[2.7rem] 
            lg:w-[clamp(4rem,6.5dvw,6rem)] lg:h-[clamp(4rem,6.5dvw,6rem)]
            '
        />
      </div>
    </div>
  );
}
