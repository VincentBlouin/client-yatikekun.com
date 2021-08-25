const communicationTools = ['Messenger', 'Email', 'Phone'];
const communicationIcons = {
    Email: 'email',
    Phone: 'phone',
    Messenger: 'messenger'
};
export default {
    getTools: function () {
        return communicationTools;
    },
    getCommunicationIcons: function () {
        return communicationIcons;
    },
    reviewForMember: function (member) {
        if (member.preferredCommunication === undefined || member.preferredCommunication === null) {
            member.preferredCommunication = {};
        }
        let lastIndex = -1;
        communicationTools.forEach((communicationTool) => {
            if (member['contactBy' + communicationTool] === false) {
                member.preferredCommunication[communicationTool] = -1;
            } else if (member.preferredCommunication[communicationTool] === undefined || member.preferredCommunication[communicationTool] === -1) {
                member.preferredCommunication[communicationTool] = lastIndex + 1;
            }
            if (member.preferredCommunication[communicationTool] > lastIndex) {
                lastIndex = member.preferredCommunication[communicationTool];
            }
            // alert(communicationMode + " " + member.preferredCommunication[communicationMode])
        });
        return Object.keys(member.preferredCommunication).sort((a, b) => {
            const aIndex = member.preferredCommunication[a];
            const bIndex = member.preferredCommunication[b];
            if (aIndex === -1) {
                return bIndex > aIndex ? 1 : 0;
            }
            if (bIndex === -1) {
                return aIndex > bIndex ? -1 : 0;
            }
            return aIndex - bIndex;
        }).map((key) => {
            return {
                value: key,
                index: member.preferredCommunication[key]
            }
        });
    }
}
