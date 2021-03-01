import { startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';
import Appointment from '../models/Appointment';

class AvailableController {
  async index(req, res) {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'invalid date' });
    }

    const seachDate = Number(date);

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.params.providerid,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(seachDate), endOfDay(seachDate)],
        },
      },
    });

    return res.json(appointments);
  }
}

export default new AvailableController();
