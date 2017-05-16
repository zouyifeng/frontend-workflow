import g from '../../global'
import template from './index.html'
import './style.css'

export default class {
    mount(container) {
        document.title = 'foo'
        container.innerHTML = template
        container.querySelector('.foo__gobar').addEventListener('click', () => {
            g.router.go('/bar')
        })
    }
}