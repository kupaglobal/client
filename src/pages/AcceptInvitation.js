import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { authStore } from "../store/auth";
import { toastStore } from "../store/toast";
import OrganisationService from "../services/organisation.service";

const AcceptInvitation = () => {
  const {toast} = useContext(toastStore)
  const {state: authState} = useContext(authStore)  

  const params = useParams()

  const goTo = useNavigate()
  const [reload, setReload] = useState(true)
  useEffect(() => {
    async function checkForAuth() {
        setReload(false)
        if (params.invitationId) {
            const invitation = (await getInvitation(params.invitationId)).data

            if (!authState.loggedInUser) { // not logged in
                localStorage.setItem('accept-invitation', JSON.stringify(invitation))
                toast('info', 'You need to create an account first')
            } else { // logged in 
                await acceptInvitation(params.invitationId)
                toast('success', `You have been successfully added to ${invitation.organisation.name}!`)
                return goTo('/organisation')
            }
        }
        goTo('/auth/signup')
    }
    function acceptInvitation(invitationId) {
        return OrganisationService.acceptInvitation(invitationId)
    }
    function getInvitation(invitationId) {
        return OrganisationService.getInvitationById(invitationId)
    }
    if (reload) {
        checkForAuth()
    }
  }, [toast, authState.loggedInUser, goTo, params.invitationId, reload ])
  return (
    <div>
        Please wait while we add you to the organisation...
    </div>
  );
};

export default AcceptInvitation;
