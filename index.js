/**
 * Sends a message to a Discord webhook.
 * This function is designed to be triggered by Google Cloud Scheduler.
 *
 * @param {object} req The HTTP request object.
 * @param {object} res The HTTP response object.
 */
export async function sendScheduledGif(req, res) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  const gifUrl = 'https://tenor.com/view/hello-christian-christian-shoebill-gif-7431113955302956858';

  if (!webhookUrl) {
    const errorMsg = 'DISCORD_WEBHOOK_URL environment variable is not set.';
    console.error(errorMsg);
    res.status(500).send(errorMsg);
    return;
  }

  const payload = {
    content: gifUrl,
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error from Discord API: ${response.status} - ${errorText}`);
      res.status(response.status).send(`Failed to send message. Discord API responded with: ${errorText}`);
      return;
    }

    console.log('Successfully sent the GIF to Discord.');
    res.status(200).send('GIF sent successfully!');

  } catch (error) {
    console.error('An unexpected error occurred:', error);
    res.status(500).send('An internal error occurred.');
  }
}