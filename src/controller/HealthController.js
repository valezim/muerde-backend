class HealthController {
  static async ping(req, res) {
    return res.status(200).json({
      message: 'pong',
    });
  }
}

module.exports = HealthController;
