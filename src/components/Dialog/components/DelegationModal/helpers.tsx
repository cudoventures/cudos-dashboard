import { Tooltip, Button } from '@mui/material'
import CurrencyInput from 'react-currency-input-field'
import CudosLogo from 'assets/vectors/cudos-logo.svg'
import { customInputStyle } from "../styles"

export const CustomEndAdorment = ({
    handleClick
}: {
    handleClick: () => Promise<void>
}) => {
    return (
        <Tooltip title="Total balance minus the highest estimated fee (estimated transaction fee x4)">
            <Button
                variant="contained"
                color="primary"
                size="small"
                sx={() => ({
                    padding: '4px 15px',
                    fontWeight: 600
                })}
                onClick={handleClick}
            >
                MAX
            </Button>
        </Tooltip>
    )
}

export const customInputProps = (
    delegationAmount: string,
    setDelegationAmount: React.Dispatch<React.SetStateAction<string>>,
    handleMaxAmount: () => Promise<void>
) => {

    return {
        inputComponent:
            () => <CustomInputComponent
                displayValue={delegationAmount}
                setValue={setDelegationAmount}
            />,
        disableUnderline: true,
        startAdornment: <img src={CudosLogo} alt="cudos-logo" />,
        endAdornment: <CustomEndAdorment handleClick={handleMaxAmount} />
    }
}

export const CustomInputComponent = ({
    displayValue,
    setValue
}: {
    displayValue: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
}) => {

    return (
        <CurrencyInput
            autoFocus={true}
            style={customInputStyle}
            placeholder="0 CUDOS"
            decimalsLimit={18}
            value={displayValue}
            onValueChange={(value) => setValue(value!)}
        />
    )
}
