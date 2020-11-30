import Images from "@/Images";

export default {
    format: function (offer) {
        // offer.userFullname = offer.User.firstname + " " + offer.User.lastname;
        if (offer.image) {
            offer.image = Images.getImageWithName(offer.image);
        }
        offer.description = offer.title_fr[0].toUpperCase() + offer.title_fr.substr(1);
        return offer;
    }
}