import '../../assets/styles/components/logout.css'
import { ChatSystem } from '../../services/chatsystem';
import { UserSystem } from '../../services/userSystem'
import { useNavigate } from 'react-router-dom';

function LogOut() {
	const navigate = useNavigate()

	const  logout = async () => {
		try {
			const responde = await UserSystem.logout()
			if (responde.status === 200){
				navigate('/')
        await ChatSystem.logoutSocket()
			}
		} catch {
			console.log()
		}
	}

  return (
    <button id="logout" title='Log out' onClick={logout}>
      <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000">
				<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#00ff00" stroke="none">
						<path d="M325 5106 c-148 -37 -271 -159 -311 -310 -11 -42 -14 -384 -14 -2021
						0 -2157 -3 -2031 57 -2135 37 -62 111 -134 169 -163 27 -13 350 -125 719 -248
						l670 -224 90 0 c110 0 172 20 255 81 67 49 121 123 150 207 16 46 20 82 20
						202 l0 145 378 0 c285 0 393 4 443 14 207 44 391 223 444 431 22 87 22 1131 0
						1175 -32 62 -115 99 -183 81 -46 -13 -99 -65 -112 -112 -6 -20 -10 -242 -10
						-549 l0 -515 -24 -51 c-13 -27 -42 -66 -66 -87 -76 -65 -90 -67 -502 -67
						l-368 0 -2 1708 -3 1707 -31 66 c-70 147 -138 194 -420 288 l-209 70 701 0
						c779 1 753 3 834 -66 24 -21 53 -60 66 -87 l24 -51 0 -515 c0 -317 4 -529 10
						-552 14 -49 76 -104 129 -113 53 -9 126 25 158 74 l23 34 0 546 c0 602 0 606
						-63 731 -21 42 -59 92 -108 142 -61 63 -92 85 -160 117 -46 22 -111 44 -143
						50 -90 17 -2544 14 -2611 -3z m782 -527 c555 -185 666 -225 683 -246 20 -26
						20 -38 20 -1985 l0 -1960 -34 -34 c-23 -23 -43 -34 -63 -34 -27 0 -1294 417
						-1340 441 -11 6 -29 25 -38 43 -15 28 -16 191 -13 1982 3 1936 3 1952 23 1974
						22 25 50 38 80 39 11 1 318 -98 682 -220z"/>
						<path d="M4095 3826 c-41 -18 -83 -69 -91 -111 -16 -86 -14 -89 289 -392 l282
						-283 -840 0 -840 0 -39 -23 c-109 -61 -106 -221 5 -277 37 -19 62 -20 876 -20
						l838 0 -282 -282 c-304 -305 -305 -307 -288 -395 9 -49 69 -109 118 -118 91
						-17 77 -29 540 433 236 235 435 439 443 454 18 35 18 101 0 136 -23 42 -857
						870 -889 882 -38 14 -85 12 -122 -4z"/>
				</g>
			</svg>
    </button>
  )
}

export default LogOut