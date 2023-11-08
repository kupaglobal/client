import { useContext, useEffect, useState } from "react";
import TemplateCard from "../../../components/Cards/TemplateCard";
import { TemplatesService } from "../../../services/templates.service";
import { SET_ACTIVE_TEMPLATE } from "../../../store/actions";
import { templatesStore } from "../../../store/templates";
import { toastStore } from "../../../store/toast";
import { cleanedDateStr } from "../../../utils/moment";


const TemplatesContainer = ({ setActiveStep, setActiveTemplate }) => {
  const [isDownloading, setIsDownloading] = useState(false)
  const [templates, setTemplates] = useState([])
  const { toast } = useContext(toastStore);
  const { dispatch } = useContext(templatesStore)


  useEffect(() => {
    async function fetchTemplates() {
      try {
        const {data: templatesRes} = await TemplatesService.getTemplates()
        const templates = templatesRes.templates.map(template => ({ ...template, isSelected: false }))
        setTemplates(templates)
      } catch (e) {
        toast('error',e.response?.data?.error ? e.response?.data?.error : e.message)
        console.log(e)
      }
    }
    fetchTemplates()
  }, [toast])

  const downloadTemplate = async (template) => {
    try {
      setIsDownloading(template.id)
      await TemplatesService.downloadTemplate(template);
      setIsDownloading(null)
    } catch (e) {
      toast('error',e.response?.data?.error ? e.response?.data?.error : 'Failed to download the template.')
      console.log(e)
      setIsDownloading(null)
    }
  }

  const onSelected = (template) => {
    setActiveStep(1)
    setActiveTemplate(template)
    dispatch({
      type: SET_ACTIVE_TEMPLATE,
      payload: template
    })
  }

  return (
    <div className="flex items-center flex-row space-x-10">
      {templates.map(
        template => 
          <TemplateCard 
            id={template.id}
            key={template.id}
            title={template.name}
            date={cleanedDateStr(template.dateCreated)}
            hideImg={true}
            category={`Created by ${template.createdBy.firstName} ${template.createdBy.lastName}`}
            description={template.fields.map(field => field.displayName).join(", ")}
            selected={template.isSelected}
            loading={isDownloading === template.id}
            onDownloadTemplate={() => downloadTemplate(template)}
            onSelected={() => onSelected(template)}
          />)}
    </div >
  );
};

export default TemplatesContainer;
