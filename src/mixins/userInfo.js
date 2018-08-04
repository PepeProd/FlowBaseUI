export const userInfo = {
    computed: {
        isUserLoggedin: function() {
            var user = this.$store.getters.activeUser;
            if (typeof user.username == 'undefined' || user.username == "")
                return false;
            return true;
        }
    }
}