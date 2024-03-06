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
  