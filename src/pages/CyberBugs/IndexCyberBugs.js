import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ContentCyberBugs from '../../components/CyberBugsComponents/Content/ContentCyberBugs'
import HeaderMainCyberBugs from '../../components/CyberBugsComponents/Main/HeaderMainCyberBugs'
import InfoMainCyberBugs from '../../components/CyberBugsComponents/Main/InfoMainCyberBugs'
import { getProjectDetailApiActions } from '../../redux/actions/CyberBugs/ProjectActions';

export default function IndexCyberBugs(props) {
    const { projectDetail } = useSelector(state => state.ProjectCyberBugsReducers)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProjectDetailApiActions(props.match.params.projectId))
    }, [])
    
    return (
        <>
            <HeaderMainCyberBugs projectDetail={projectDetail} />
            <InfoMainCyberBugs projectDetail={projectDetail} />
            <ContentCyberBugs projectDetail={projectDetail} />
        </>
    )
}
