import { Move, User, Hash, Image as ImageIcon } from "lucide-react";

/**
 * @typedef {Object} InfoItemProps
 * @property {React.ReactNode} icon - Lucide icon component
 * @property {string} label - Label text for the info item
 * @property {string} value - Value text for the info item
 * @property {string} [iconColor] - Tailwind color class for the icon
 */

/**
 * Individual info item component
 * 
 * @param {InfoItemProps} props - Component props
 * @returns {JSX.Element} A single info item with icon, label, and value
 */
function InfoItem({ icon, label, value, iconColor = "text-gray-600" }) {
  const IconComponent = icon;
  
  return (
    <div className="flex items-start gap-3">
      <IconComponent className={`w-5 h-5 ${iconColor} mt-1`} />
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{label}</p>
        <p className="font-medium text-gray-900 text-sm">{value}</p>
      </div>
    </div>
  );
}

/**
 * @typedef {Object} ImageInfoGridProps
 * @property {Object} image - Image data object
 * @property {string} image.width - Image width
 * @property {string} image.height - Image height
 * @property {string} image.author - Image author/photographer
 * @property {string} image.id - Image ID
 */

/**
 * Image information grid component
 * Displays image metadata in a responsive grid layout
 * 
 * @param {ImageInfoGridProps} props - Component props
 * @returns {JSX.Element} Grid of image information items
 * 
 * @example
 * <ImageInfoGrid image={{
 *   width: "1920",
 *   height: "1080", 
 *   author: "John Doe",
 *   id: "123"
 * }} />
 */
export default function ImageInfoGrid({ image }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <InfoItem 
        icon={Move}
        label="Dimensions"
        value={`${image.width} × ${image.height} px`}
        iconColor="text-blue-600"
      />
      
      <InfoItem 
        icon={User}
        label="Photographer"
        value={image.author}
        iconColor="text-green-600"
      />
      
      <InfoItem 
        icon={Hash}
        label="Photo ID"
        value={image.id}
        iconColor="text-purple-600"
      />
      
      <InfoItem 
        icon={ImageIcon}
        label="Format"
        value="JPEG Image"
        iconColor="text-orange-600"
      />
    </div>
  );
}