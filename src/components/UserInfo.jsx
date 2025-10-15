/**
 * @typedef {Object} UserInfoProps
 * @property {string} name - The name of the user to display
 */

/**
 * UserInfo component displays a user avatar with initials and name
 * 
 * @param {UserInfoProps} props - Component props
 * @returns {JSX.Element} A user info display with avatar and name
 * 
 * @example
 * <UserInfo name="John Doe" />
 */
export default function UserInfo({ name }) {

  /**
   * Generates a consistent HSL color from a string
   * Same string will always produce the same color
   * 
   * @param {string} str - Input string to generate color from
   * @returns {string} HSL color string in format "hsl(h, s%, l%)"
   */
  const getColorFromName = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const hue = Math.abs(hash % 360);
    const saturation = 65; // Medium saturation
    const lightness = 55; // Medium lightness
    
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  /**
   * Extracts initials from a name string
   * 
   * @param {string} name - The name to extract initials from
   * @returns {string} Uppercase initials (2 characters) or '?' if name is invalid
   */
  const getInitials = (name) => {
    if (!name) return '?';
    
    const words = name.trim().split(/\s+/);
    
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    } else {
      return (words[0][0] + words[words.length - 1][0]).toUpperCase();
    }
  };

  const initials = getInitials(name);
  const backgroundColor = getColorFromName(name);

  return (
    <div className="flex items-center gap-2">
      <div 
        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-xs"
        style={{ backgroundColor }}
      >
        {initials}
      </div>
      <span className="font-bold text-gray-800">{name}</span>
    </div>
  );
}
