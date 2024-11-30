import PropTypes from 'prop-types';
import Image from '../../Image';
// ----------------------------------------------------------------------

export default function AvatarPreview2({ imgUrl }) {
    return (
        <Image
            alt="avatar"
            src={imgUrl}
            sx={{
                zIndex: 8,
                overflow: 'hidden',
                borderRadius: '50%',
                position: 'absolute',
                width: `calc(100% - 16px)`,
                height: `calc(100% - 16px)`,
            }}
        />
    );
}