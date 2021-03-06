# from volunteers.models import RegisterVolunteers
import re


class VolunteerForm():
    def __init__(self, data):
        self.android = data.get('android', '')
        self.shirt = data.get('shirt', '')
        self.identity = data.get('dni_nie', '')
        self.schedule = data.get('schedule_options', [])

    def get_error(self):
        if self.identity == '' :
            return 'Compruebe el DNI/NIE'

        if self.android == '' or not isinstance(self.android, bool) or self.shirt == '':
            return 'Compruebe los datos'

        # Check schedule have at least 5 sessions
        if len(self.schedule) < 5 :
            return 'Compruebe que al menos haya seleccionado 5 sesiones'

        return ''
