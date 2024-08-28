import formatter from '@/utils/formatter/transform.js'; 

export const checkInputValidity = function (v$, dataProperty, parentProperty = null, validations = []) {
    let errors = [];
    const field = parentProperty ? v$[parentProperty][dataProperty] : v$[dataProperty];
    
    if (field.$invalid) {
        for (const error of field.$errors) {
            let formattedProperty;
            const property = error.$property;

            // Check if the property contains an underscore
            formattedProperty = property.includes('_') 
                ? formatter.capitalizeSplitWord(property) 
                : formatter.capitalizeFirstLetter(property);
            
            const transformedMessage = error.$message
                .replace(/This field/i, formattedProperty)
                .replace(/Value/i, formattedProperty)
                .replace(/The/i,'');
            
            
            // Push the message into the array for the current property
            errors.push(transformedMessage);
        }
    }
    
    return errors;
};
