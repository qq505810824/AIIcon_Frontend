import ContactCard from './ContactCard';

interface ViewProps {
    data: any[];
    handleRefresh?: any;
}

export default function ContactLayout({ data, handleRefresh }: ViewProps) {
    return (
        <>
            <div className="space-y-2 mb-8">
                {data?.map((product, index) => (
                    <ContactCard handleRefresh={handleRefresh} product={product} key={index} />
                ))}
            </div>
        </>
    );
}
