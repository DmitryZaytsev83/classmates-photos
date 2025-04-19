// app/components/HeroSection.tsx
import {Typography} from 'antd';
import GridContainer from "@/components/GridContainer/GridContainer";

const {Title, Paragraph} = Typography;

export default function HeroSection() {
    return (
        <div
            style={{
                textAlign: 'center',
                padding: '100px 20px'
            }}>
            <GridContainer>
                <Title level={1}>Добро пожаловать!</Title>
                <Paragraph>
                    Это сайт для учеников школы №70 города Рязани выпуска 2000 года.
                </Paragraph>
            </GridContainer>
        </div>
    );
}
