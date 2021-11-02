import Images from "@/Images";
import linkifyHtml from 'linkifyjs/html'

export default {
    format: function (offer, isForEdition) {
        // offer.userFullname = offer.User.firstname + " " + offer.User.lastname;
        if (offer.image) {
            offer.image = Images.getImageWithName(offer.image);
        }
        offer.description = offer.title_fr[0].toUpperCase() + offer.title_fr.substr(1);
        offer.experience = offer.experience_fr || "";
        offer.additionalFees = offer.additionalFees_fr || "";
        if (isForEdition) {
            return offer;
        }
        if (offer.User && offer.User.facebookId && offer.User.facebookId.indexOf(" ") === -1) {
            const facebookId = offer.User.facebookId
            if (facebookId.indexOf("facebook.com") > -1) {
                const urlParts = facebookId.split("/");
                let lastPart = urlParts[urlParts.length - 1];
                if (lastPart === "") {
                    lastPart = urlParts[urlParts.length - 2];
                }
                offer.User.facebookUsername = lastPart;
            } else {
                offer.User.facebookUsername = facebookId;
            }
        }
        if (offer.User && offer.User.language) {
            offer.User.languageFormatted = offer.User.language.join(", ");
        }
        const linkifyOptions = {
            target: {
                url: '_blank'
            }
        }
        offer.description = linkifyHtml(
            offer.description,
            linkifyOptions
        );
        offer.experience = linkifyHtml(
            offer.experience,
            linkifyOptions
        );
        offer.additionalFees = linkifyHtml(
            offer.additionalFees,
            linkifyOptions
        );
        return offer;
    }
}
