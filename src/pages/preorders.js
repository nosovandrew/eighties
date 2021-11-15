import styled from "styled-components";
import { NextSeo } from "next-seo";

import { media } from "@/styles/media";
import Layout from "@/components/templates/layout";
import { PageH1, TextBlock } from "@/components/atoms/text";

const PreordersContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media ${media.md} {
        width: auto;
        height: var(--full-screen-h);
        margin: 0;
    }
`;

export default function PreorderInfo() {
    return (
        <Layout>
            <NextSeo
                title='О предзаказах'
                description= 'Вся информация о системе предзаказов, по которой работает бренд в настоящее время. Данная система не является постоянной, и может быть заменена на более классическую.'
            />
            <PreordersContainer>
                <PageH1>Предзаказы</PageH1>
                <TextBlock>
                    Мы стараемся быть по максимуму открытыми для своих клиентов.{' '}
                    В первую очередь, хочется понять, интересна ли вам та или иная наша задумка.
                </TextBlock>
                <TextBlock>
                    Поэтому мы отшили демонстрационные образцы и запустили предзаказы (без каких-либо предоплат).{' '}
                    Скоро будет опубликован счетчик предзаказов, когда наберется 10 (не важно, какой цвет), мы сразу отошьем и отправим первую партию.
                </TextBlock>
            </PreordersContainer>
        </Layout>
    );
}