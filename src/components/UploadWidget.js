import { useRef, useEffect } from 'react';

const UploadWidget = () => {

    const cloudinaryRef = useRef();
    const widgetRef = useRef();


    useEffect(()=> {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'jhhernan01',
            uploadPreset: 'rebuskate',
            sources: ['local','camera' , 'image_search']
        }, function(error, result){
            console.log('El resultado es:', result)
        })


    }, [])

    return <button onClick={() => {widgetRef.current.open()}}>Upload images</button>
}
export default UploadWidget;