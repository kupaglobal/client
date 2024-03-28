
import React, { useState, useEffect } from 'react';
import {DashboardService} from '../../../services/dashboard.service'
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { NavLink, useNavigate } from "react-router-dom";
import { rankTrophy } from '../../../utils';
import { Tooltip } from 'primereact/tooltip';
        
export default function TopPerformers() {
    const [topPerformersData, setTopPerformersData] = useState(null);
    const [shouldRefetch, setShouldRefetch] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    const [nodes, setNodes] = useState([])
    const goTo = useNavigate()


    useEffect(() => {
        async function getTopPerformers() {
            try {
                setIsLoading(true)
                const {data: {data: topPerformersData}} = await DashboardService.getTopPerformers()
                setShouldRefetch(false)
                setTopPerformersData(topPerformersData)
                setIsLoading(false)
                setNodes(topPerformersData.map((assessmentTopPerformer, index) => {
                    return {
                        key: assessmentTopPerformer.assessment.id,
                        label: 'Assessment Name',
                        data: { name: assessmentTopPerformer.assessment.name, student: '', rank: '' },
                        children: assessmentTopPerformer.topPerformers.sort((a, b) => b.score - a.score).map((topPerformer, topPerformerIndex) => {
                            return {
                                key: topPerformer.id,
                                label: 'Student',
                                data: { name: '', student: topPerformer.student, rank: topPerformer }
                            }
                        })
                    }
                }))
                // setNodes([{
                //     key: '0',
                //     label: 'Documents',
                //     data: {name: 'Assessment Name', student: '', rank: ''},
                //     icon: 'pi pi-fw pi-inbox',
                //     children: [
                //         {
                //             key: '0-0',
                //             label: 'Work',
                //             data: 'Work Folder',
                //             icon: 'pi pi-fw pi-cog',
                //             data: { name: '', student: 'Bakani', rank: 1}
                //         },
                //         {
                //             key: '0-1',
                //             label: 'Home',
                //             data: 'Home Folder',
                //             icon: 'pi pi-fw pi-home',
                //             data: { name: '', student: 'Bakani', rank: 2}
                //         }
                //     ]
                // }])
            } catch (e) {
                console.error('error fetching', e)
                setShouldRefetch(false)
                setIsLoading(false)
            }
        }
        if (shouldRefetch) {
            getTopPerformers()
        }
    }, [shouldRefetch]);

    const handleClick = (rowData) => {
        goTo(`/students/${rowData.data.student.id}`)
    }
    const nameTemplate = (rowData) => {
        
        return (
            <NavLink to={`/students/${rowData.data.student.id}`}>
                {rowData.data.student.firstName} {rowData.data.student.lastName}
            </NavLink>
        );
    };
    
    const rankTemplate = (row) => {
        return (
            <>
                <Tooltip target=".tooltip"/>
                <span className="tooltip" data-pr-tooltip={`#${row.data.rank.rank} Top Performer`}>{row.data.rank.score} {rankTrophy[row.data.rank.rank]}</span>
            </>
        )
    }
    return (
        <>  {topPerformersData && !isLoading ? 
            <div className="card w-full">
                <TreeTable value={nodes} className='w-full'>
                    <Column field="name" header="Assessment" expander></Column>
                    <Column field="student" header="Student" body={nameTemplate} on ></Column>
                    <Column field="rank" header="Score & Rank" body={rankTemplate}></Column>
                </TreeTable>
            </div>
            : null 
            }
        </>
    )

}