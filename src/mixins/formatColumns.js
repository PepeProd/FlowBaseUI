export const formatColumns = {
    methods: {
        formatColumn: function(name) {
            return name.toString().split('_').join(' ');
        },
    }
}