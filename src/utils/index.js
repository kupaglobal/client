import { Skeleton } from "primereact/skeleton";
import { Tooltip } from "primereact/tooltip";

export function ucFirst(str) {
    return !str || str === null ? '' : (str.toLowerCase().charAt(0).toUpperCase() + str.toLowerCase().slice(1)).replace(/_/g, ' ');
}
  
export const rankTrophy = {
    1: '🏆🏆🏆',
    2: '🏆🏆',
    3: '🏆'
}

export const loadingSkeleton = (<><div className="w-full justify-center border-round border-1 surface-border p-4">
<ul className="m-0 p-0 list-none">
    <li className="mb-3">
        <div className="flex">
            <div style={{ flex: '1' }}>
                <Skeleton width="100%" className="mb-2"></Skeleton>
            </div>
        </div>
    </li>
    <li className="mb-3">
        <div className="flex">
            <div style={{ flex: '1' }}>
                <Skeleton width="100%" className="mb-2"></Skeleton>
            </div>
        </div>
    </li>
    <li className="mb-3">
        <div className="flex">
            <div style={{ flex: '1' }}>
                <Skeleton width="100%" className="mb-2"></Skeleton>
            </div>
        </div>
    </li>
    <li>
        <div className="flex">
            <div style={{ flex: '1' }}>
                <Skeleton width="100%" className="mb-2"></Skeleton>
            </div>
        </div>
    </li>
</ul>
</div></>)
  
export const graphSkeleton = (<div className="flex mt-4 w-full" style={{justifyContent: "center", alignItems: 'center'}}>
<Skeleton size="1.5rem" height="4rem" className="mr-2 h-15rem"></Skeleton>
<Skeleton size="1.5rem" height="4rem" className="mr-2 h-15rem"></Skeleton>
<Skeleton size="1.5rem" height="4rem" className="mr-2 h-15rem"></Skeleton>
<Skeleton size="1.5rem" height="4rem" className="h-15rem"></Skeleton>
</div>)

export const moneyFormatter = (currency = 'GBP', locale = 'en-US') => new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
});

export function studentFullName(student) {
    return student ? `${student.firstName} ${student.middleName ? `${student.middleName} `: ''}${student.lastName}` : '---'
}

export const studentName = (student) => {
    const name = `${student.firstName} ${student.middleName ? ` ${student.middleName} `: ''}${student.lastName}`
    return (student.topPerformerRank && student.topPerformerScore) ? <><Tooltip target=".tooltip"/><span className="tooltip" data-pr-tooltip={`#${student.topPerformerRank} Top Performer`}>{name} {rankTrophy[student.topPerformerRank]}</span></> : name
}
  

export const truncateStringWithEllipsis = (str, length) => {
    if (!str) return ''
    if (str.length <= length) return str
    return `${str.slice(0, length)}...`
}
  