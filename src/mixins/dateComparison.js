export const dateComparison = {
    methods: {
        compareExpiration: function(row) {
            var eDate = new Date(row);
            var thresholdDate = new Date(Date.now());
            thresholdDate.setDate(thresholdDate.getDate() + 1);
            if (eDate.getTime() < thresholdDate.getTime()) {
                return true;
            }
            return false;
        },
        compareSoonExpiration: function(row) {
            var eDate = new Date(row);
            var thresholdExpireDate = new Date(Date.now());
            thresholdExpireDate.setDate(thresholdExpireDate.getDate() + 1);
            var thresholdExpireSoonDate = new Date(Date.now());
            thresholdExpireSoonDate.setDate(thresholdExpireSoonDate.getDate() + 30);
            if (eDate.getTime() > thresholdExpireDate.getTime() && eDate.getTime() < thresholdExpireSoonDate.getTime()) {
                return true;
            }
            return false;
        },
        compareNotExpiring: function(row) {
            var eDate = new Date(row);
            var thresholdDate = new Date(Date.now());
            thresholdDate.setDate(thresholdDate.getDate() + 30);
            if (eDate.getTime() > thresholdDate.getTime()) {
                return true;
            }
            return false;
        } 
    }
}