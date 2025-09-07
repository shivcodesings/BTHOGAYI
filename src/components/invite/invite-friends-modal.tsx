@@ .. @@
 export function InviteFriendsModal({ isOpen, onClose }: InviteFriendsModalProps) {
   const [inviteCode, setInviteCode] = useState('')
   const [shareLink, setShareLink] = useState('')
   const [isLoading, setIsLoading] = useState(false)
   const [copied, setCopied] = useState(false)
+  const [emails, setEmails] = useState('')
+  const [invitesSent, setInvitesSent] = useState(0)
+  const { inviteModalOpen, setInviteModalOpen } = useAppStore()
   const { user } = useAppStore()
 
-  const inviteLink = `${window.location.origin}?ref=invite`
+  const inviteLink = `${window.location.origin}?ref=${user?.id || 'invite'}`