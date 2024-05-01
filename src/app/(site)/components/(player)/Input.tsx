import useVolume from '@/hooks/(player)/useVolume';
import { cn } from '@/libs/utils';
const Input = () => {
  const { mute, volume, setVolume, setMute, setChange } = useVolume();
  const MAX = 1;
  const getBackgroundSize = () => {
    return { backgroundSize: `${(volume * 100) / MAX}% 100%` };
  };
  return (
    <input
      disabled={mute}
      type="range"
      step={'any'}
      min={0}
      max={MAX}
      value={volume}
      onMouseDown={() => setChange(true)}
      onChange={(e) => setVolume(+e.target.value)}
      onMouseUp={() => setChange(false)}
      className={cn(
        'w-full h-[3px] bg-contentDesc ',
        mute ? 'cursor-not-allowed' : 'cursor-pointer',
      )}
      style={getBackgroundSize()}
      title="Volume"
    />
  );
};
export default Input;
