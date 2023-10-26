import './App.css';
import { Img } from 'react-image';
import { useState } from 'react';
import jsQR from 'jsqr';

function App() {
    const [url, setUrl] = useState('');
    const [data, setData] = useState<any>(undefined);

    async function onImageChange(e: any) {
        if (e.target.files && e.target.files[0]) {
            const img = e.target.files[0];
            setUrl(URL.createObjectURL(img));

            const image = new Image();
            image.src = URL.createObjectURL(img);

            image.onload = () => {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = image.width;
                canvas.height = image.height;
                context?.drawImage(image, 0, 0);
                const imageData = context?.getImageData(0, 0, image.width, image.height);

                if (imageData) {
                    const code = jsQR(imageData.data, image.width, image.height);
                    console.log(code);
                    if (code) {
                        setData(code.data);
                    }
                }
            };
        }
    }

    return (
        <>
            <input type='file' onChange={onImageChange}></input>
            <div>
                {url && <Img className='imagem' src={url} alt="qr code" />}
            </div>

            <div className='qr-code-info'>
                {data}
            </div>
        </>
    )
}

export default App;
