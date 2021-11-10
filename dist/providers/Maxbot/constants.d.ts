export declare enum ReqType {
    GETSTATUS = "get_status",
    GETSEGMENTATION = "get_segmentation",
    GETTEMPLATE = "get_template",
    GETSERVICESECTOR = "get_service_sector",
    GETATTENDANT = "get_attendant",
    GETCONTACT = "get_contact",
    GETPROT = "get_prot",
    PUTCONTACT = "put_contact",
    SETCONTACT = "set_contact",
    OPENFOLLOWUP = "open_followup",
    SENDTEXT = "send_text",
    SENDIMAGE = "send_image",
    SENDFILE = "send_file",
    SENDSOUND = "send_sound",
    SENDVIDEO = "send_video"
}
export declare const baseURL = "https://mbr.maxbot.com.br/api/v1.php";
