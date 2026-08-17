interface IconProps {
  imageSrc: string;
  altText: string;
}

export function Icon({ imageSrc, altText }: IconProps) {
  return (
    <img
      src={imageSrc}
      alt={altText}
      className='
        w-8 h-8
        md:w-[2.7rem] md:h-[2.7rem] 
        lg:w-16 lg:h-16
        '
    />
  );
}
