import { Icon } from './Icon';

interface IconBlockProps {
  iconName: string;
}

export function IconBlock({ iconName }: IconBlockProps) {
  const imageSrc = `/images/${iconName}.png`;
  const capitalIconName = iconName.charAt(0).toUpperCase() + iconName.slice(1);

  return (
    <div
      className='
        flex items-center flex-wrap
        justify-center gap-2
        '
    >
      <h2>{capitalIconName} = </h2>
      <Icon imageSrc={imageSrc} altText={capitalIconName} />
    </div>
  );
}
