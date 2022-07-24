import { Button, Input, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AppService from "../../../Service/ApiService";
import GameType from "../../User/GameTypes/GameType";
import "./manage.css"

const Manage = () => {

    const [firstTimeLevel, setFirstTimeLevel] = useState(0)
    const [firstPercentage, setFirstPercentage] = useState(0)
    const [secondTimeLevel, setSecondTimeLevel] = useState(0)
    const [secondPercentage, setSecondPercentage] = useState(0)
    const [thirdTimeLevel, setThirdTimeLevel] = useState(0)
    const [thirdPercentage, setThirdPercentage] = useState(0)

    const [gameType, setGameType] = useState([])

    const toast = useToast()

    const getData = () => {
        AppService.getManage().then(res => {
            console.log(res.data)
            setFirstTimeLevel(res.data?.firstTimeInterval?.interval)
            setFirstPercentage(res.data?.firstTimeInterval?.percentage)
            setSecondTimeLevel(res.data?.secondTimeInterval?.interval)
            setSecondPercentage(res.data?.secondTimeInterval?.percentage)
            setThirdTimeLevel(res.data?.thirdTimeInterval?.interval)
            setThirdPercentage(res.data?.thirdTimeInterval?.percentage)
        })
    }

    const handleSubmit = () => {

        const payload = {
            firstTimeInterval: {
                interval: firstTimeLevel,
                percentage: firstPercentage
            },
            secondTimeInterval: {
                interval: secondTimeLevel,
                percentage: secondPercentage
            },
            thirdTimeInterval: {
                interval: thirdTimeLevel,
                percentage: thirdPercentage
            }
        }

        console.log(payload)

        AppService.updateManage(payload).then(res => {
            console.log(res)
            if(res.status === 200) {
                getData()
                return  toast({
                    title: 'Updated Successfully',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                  })

            }
            
        }).catch(err => {
            console.log(err)
            return  toast({
                title: err.response.data.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
                })
        })

    }

    useEffect(() => {

        getData()

    }, [])

    return (
        <div>
            <div className="manage-panel">
                <div>
                <h4 className="page-text">Manage</h4>
                <div className="input-manage-panel">
                    <Text><b>First Time Level</b></Text>
                    <hr/>
                    <br/>
                    <Text><b>Interval</b></Text>
                    <Input className="manage-input" placeholder='Interval' value={firstTimeLevel} onChange={e => setFirstTimeLevel(e.target.value)} />
                    <Text><b>Percentage</b></Text>
                    <Input className="manage-input" placeholder='Percentage' value={firstPercentage} onChange={e => setFirstPercentage(e.target.value)} />
                </div>
                <div className="input-manage-panel">
                    <Text><b>Second Time Level</b></Text>
                    <hr/>
                    <br/>
                    <Text><b>Interval</b></Text>
                    <Input className="manage-input" placeholder='Interval' value={secondTimeLevel} onChange={e => setSecondTimeLevel(e.target.value)} />
                    <Text><b>Percentage</b></Text>
                    <Input className="manage-input" placeholder='Percentage' value={secondPercentage} onChange={e => setSecondPercentage(e.target.value)} />
                </div>
                <div className="input-manage-panel">
                    <Text><b>Third Time Level</b></Text>
                    <hr/>
                    <br/>
                    <Text><b>Interval</b></Text>
                    <Input className="manage-input" placeholder='Interval' value={thirdTimeLevel} onChange={e => setThirdTimeLevel(e.target.value)} />
                    <Text><b>Percentage</b></Text>
                    <Input className="manage-input" placeholder='Percentage' value={thirdPercentage} onChange={e => setThirdPercentage(e.target.value)} />
                </div>
                <div className="input-manage-panel">
                    <Button colorScheme="teal" onClick={handleSubmit} >Update</Button>
                </div>
            </div>
            </div>
            <GameType />
        </div>
    )
}

export default Manage;