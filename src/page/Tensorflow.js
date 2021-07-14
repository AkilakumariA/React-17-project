import React, { useRef } from 'react';
import useTFClassify from '../utils/hooks/useTFClassify';

export default function Tensorflow() {
    const imageRef = useRef();
    const { predict, predictions, isLoading } = useTFClassify();



    return (
        <div className='flex justify-center'>
            <div className='w-1/3'>
                <h1 className='text-center'>TensorFlow Example</h1>
                <img src='https://images.unsplash.com/photo-1587300003388-59208cc962cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNDI1MTZ8MHwxfHNlYXJjaHw0fHxkb2d8ZW58MHx8fHwxNjI1NTgzNDYy&ixlib=rb-1.2.1&q=80&w=1080' alt='' width='400' crossOrigin='anonymous' ref={imageRef} />
                <div className="text-center my-5">
                    {predictions.length > 0 &&
                        predictions.map((prediction) => (
                            <div className='flex justify-between text-sm'>
                                <p>{prediction.className}</p>
                                <p>{Math.floor(prediction.probability * 100)}%</p>
                            </div>
                        ))}
                    <button className="p-2 rounded bg-gray-900 text-white w-64" onClick={() => predict(imageRef.current)}>
                        {isLoading && '⏳'}
                        {!isLoading && 'Predict Result'}
                    </button>
                </div>
            </div>
        </div>
    )
}
