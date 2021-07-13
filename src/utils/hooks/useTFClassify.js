import { useState } from 'react';
import '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';


export default function useTFClassify() {
    const [isLoading, setIsLoading] = useState(false);
    const [predictions, setPredictions] = useState([]);
    function predict(img) {
        // const img = imageRef.current;
        setIsLoading(true);
        mobilenet.load().then(model => {
            // Classify the image.
            model.classify(img).then(predictions => {
                setPredictions(predictions);
                setIsLoading(false);
            });
        });
    }

    return [predict, predictions, setPredictions, isLoading];
}
