import { Skeleton } from "primereact/skeleton";

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