export const stringUtil = {
    methods: {
        capitalizeFirstLetter: function(stringInput) {
            return stringInput.split('_').join(' ').toLowerCase().replace(/(^| )(\w)/g, s => s.toUpperCase());
        },
    }
}