export default function Burger({isOpen}) {
    return(
        <>
            <div className="burger">
                <div className="line line1"></div>
                <div className="line line2"></div>
                <div className="line line3"></div>
            </div>

            <style jsx>{`
                .burger{    
                    width: 2rem;
                    height: 2rem;
                    display: flex;
                    justify-content: space-around;
                    flex-flow: column nowrap;
                    z-index: 10;
                }

                .line{
                    width: 2rem;
                    height: 0.25rem;
                    border-radius: 10px;
                    background-color: #000000;
                    transform-origin: 1px;
                    transition: all 0.3s linear;
                    }

                .line1{
                    transform: ${isOpen ? 'rotate(45deg)' : 'rotate(0)'};
                }

                .line2{
                    transform: ${isOpen ? 'opacity(0)' : 'opacity(1)'};
                    opacity: ${isOpen ? 0 : 1};
                }

                .line3{
                    transform: ${isOpen ? 'rotate(-45deg)' : 'rotate(0)'};
                }

            `}</style>
    </>
    )
}