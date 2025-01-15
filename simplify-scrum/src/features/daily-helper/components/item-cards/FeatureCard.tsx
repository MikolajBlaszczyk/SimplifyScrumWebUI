import { EnumService } from "../../../../services/CommonServicesIndex";
import { Feature } from "../../../backlog/data/Feature";
import { MiniCard } from "../../../../components/common/card/MiniCard";
import { useEffect, useState } from "react";
import { AccountService } from "../../../account-settings/service/AccountService";
import { ExtendedDataLoader, User } from "../../../../data/CommonDataIndex";
import { Button } from "../../../../components/ComponentsIndex";
import { Role, Size, Style } from "../../../../components/common/button/ButtonProps";
import FeatureEdit from "../../../backlog/components/Items/Feature/Edit/FeatureEdit";
import { useHideModal, useModal } from "../../../../hooks/useModal";

interface FeatureCardProps{
    feature: Feature    
}

export function FeatureCard({feature}: FeatureCardProps) {
    const showModal = useModal()
    const hideModal = useHideModal()


    return(
         
            <div className={"d-flex daily-item-card  overflow-hidden flex-column m-2 justify-content-start align-items-center border rounded " } style={{height: '200px'}}>
                <div className="d-flex w-100 p-2 border-bottom daily-item-card-header overflow-hidden s-elipsis  h-auto s-bg-dark border-bottom justify-content-between align-items-center">
                    <h5 className="mb-0">
                        {feature.name} 
                    </h5>
                    <Button 
                                        className="s-button-icon"
                                        icon="bi-three-dots"
                                        role={Role.Primary}
                                        style={Style.Borderless}
                                        size={Size.Large}
                                        onClick={() => {
                                            showModal(
                                                <FeatureEdit isNotInBacklog={true} onClose={() => {hideModal()}} className="w-100"  guid={feature.guid} projectGuid={feature.projectGuid} />,
                                                "Edit Feature"
                                            )

                                        }} />
                </div>
    
                <div className="d-flex flex-column daily-item-card-body  w-100 h-100  position-relative" style={{minHeight: '100px'}}>
                        <div className="w-100 p-2 d-flex  position-absolute top-0 start-50 translate-middle-x">
                            <h6 className="mb-0">
                                {EnumService.convertExtendedStatusToString(feature.state)}
                            </h6>
                        </div>
                        <div className="w-100 p-2 d-flex justify-content-between position-absolute bottom-0 start-50 translate-middle-x">
                            <div className="d-flex w-25 align-items-center">
                                <h6 className="mb-0 me-1">Points: </h6>
                                <h6 className="mb-0">
                                        {feature.points}
                                </h6>
                            </div>
                            

                            <h6 className="mb-0">
                                {new Date(feature.lastUpdateOn).toLocaleDateString()}
                            </h6>
                        </div>
                      
                </div>
            </div>
    )
}